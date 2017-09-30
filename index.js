var saml  = require('passport-saml'),
    fs    = require('fs'),
    util  = require('util'),
    url   = require('url'),
    idps  = require('./lib/idps'),
    names = require('./lib/attributes');

function rewriteAttributes (req, profile, done) {
  var user  = {},
      error = null;

  if (typeof profile === 'function') {
    done = profile;
    profile = req;
    req = null;
  }

  if (!profile) {
    error = new Error('No SAML attributes returned');
  } else {
    Object.keys(profile).forEach(function (oid) {
      user[oid] = profile[oid];
      if (names[oid]) {
        user[names[oid]] = profile[oid];
      }
    });
  }
  return done(error, user);
}

//module.exports.Strategy = function suSAML (samlConfig) {
function suSAML (samlConfig) {
  var self = this;

  this._config = {
    protocol: 'https://',
    signatureAlgorithm: 'sha256',
    identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
    acceptedClockSkewMs: 2000,
    attributeConsumingServiceIndex: false,
    disableRequestedAuthnContext: true,
    forceAuthn: false,
    skipRequestCompression: false,
    validateInResponseTo: true,
  };

  if (samlConfig) {
    Object.keys(samlConfig).forEach(function (k) {
      var idp;
      switch (k) {
        case 'decryptionCertPath':
          self._config.decryptionCert = fs.readFileSync(samlConfig[k], 'utf8');
          break;

        case 'decryptionPvkPath':
          self._config.decryptionPvk = fs.readFileSync(samlConfig[k], 'utf8');
          break;

        case 'idp':
          idp = idps[samlConfig[k]];
          if (idp) {
            self._config.entryPoint = idp.entryPoint;
            self._config.cert = idp.cert;
            this.name = samlConfig.idp;
          } else {
            throw new Error('Unknown IDP: ' + samlConfig.idp);
          }
          break;

        case 'entityId':
        case 'entityID':
          self._config.issuer = samlConfig[k];
          break;

        default:
          self._config[k] = samlConfig[k];
          break;
      }
    });
  }

  if (!this._config.entryPoint || !this._config.cert) {
    throw new Error('No IDP defined!');
  }
  
  if (!this._config.loginPath) {
    throw new Error('No loginPath defined!');
  }

//  saml.Strategy.call(this, this._config, rewriteAttributes);

  saml.Strategy.call(this, this._config, function rewriteAttributes (req, profile, done) {
    var user  = {},
        error = null;

    if (typeof profile === 'function') {
      done = profile;
      profile = req;
      req = null;
    }

    if (!profile) {
      error = new Error('No SAML attributes returned');
    } else {
      Object.keys(profile).forEach(function (oid) {
        user[oid] = profile[oid];
        if (names[oid]) {
          user[names[oid]] = profile[oid];
        }
      });
    }
    return done(error, user);
  });

};

util.inherits(suSAML, saml.Strategy);

suSAML.prototype.protect = function protect () {
  var self = this;

  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      if (req.session) {
        req.session.authReturnUrl = req.url;
      } else {
        console.warn('passport-stanford: No session property on request!');
      }
      res.redirect(self._config.loginPath);
    }
  };
};

suSAML.prototype.return = function _return (url) {
  return function(req, res) {
    if (req.session) {
      url = req.session.authReturnUrl;
      delete req.session.authReturnUrl;
    }
    res.redirect(url || '/');
  };
};

suSAML.prototype.metadata = function metadata () {
  var self = this;
  return function(req, res) {
    res.type('application/xml');
    res.status(200).send(self.generateServiceProviderMetadata(self._config.decryptionCert));
  }
};

module.exports.Strategy = suSAML;
