var url = require('url'),
    idps = {
      'itlabv2': {
        entityID:     'https://idp.itlab.stanford.edu/idp/shibboleth',
        description:  'Stanford IT Lab IdP',
        entryPoint:   'https://idp.itlab.stanford.edu/idp/profile/SAML2/Redirect/SSO',
        cert:         [
          'MIIDQzCCAiugAwIBAgIUKuSXppluIJvYiroHZCb9QRi6uh0wDQYJKoZIhvcNAQEF',
          'BQAwITEfMB0GA1UEAxMWaWRwLml0bGFiLnN0YW5mb3JkLmVkdTAeFw0xMzA3MTAx',
          'NzU3MzhaFw0xNjA3MTAxNzU3MzhaMCExHzAdBgNVBAMTFmlkcC5pdGxhYi5zdGFu',
          'Zm9yZC5lZHUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCz67jrUj+n',
          'q3NemgxSbA4uOz9cLaZToM3uED7xy/vyFlbv8Od9i55NQSrjdDufRI/TmTI52IkI',
          'X89wyeBspyP4jOy4y3EvQtFtVlXhHiTEdsvDn87E6esl3ouhR5nUY5zH7GwJp9zp',
          'Jr3D56JGR2QpVtFbSFZbIMa6uhb9ToYNsByJeFasLWojcn1ycUrj8p8ZFk1aZio7',
          'VhJlPVdokJAhlqhlnkkZGIJHpgId0EOVrSfUNU8BdFJHlUkpvsJB3WViibLe9a5w',
          'clDVMpkMA+gapfx3Zp0ytEIIG1qv0eQe9oAb45IUYatT0JYGzgTU4pClGwimQTVm',
          'NI0dvafvyqBjAgMBAAGjczBxMFAGA1UdEQRJMEeCFmlkcC5pdGxhYi5zdGFuZm9y',
          'ZC5lZHWGLWh0dHBzOi8vaWRwLml0bGFiLnN0YW5mb3JkLmVkdS9pZHAvc2hpYmJv',
          'bGV0aDAdBgNVHQ4EFgQU9PDx6le/7k8fXsH3Qp3uaam/Jd8wDQYJKoZIhvcNAQEF',
          'BQADggEBAKpsyW92XzEVgNwdapcejQTjF0Ccp0/DSoZSaK9oCuxTVQHvhN+mJuO+',
          'Mu94gmX6BQ+GjGQAxbTwENrxa//pneJCQpBKkXJXjBMpuvFUvnthG34KZMXVqsdt',
          'kVuc9QwFULs/BPnT0RC88DsKL/WxLmUSLDjfEzD1nQSVyDeQYd71wHjETkGow/1c',
          'bgaBra/+Gsj1e+2Lbj1HzMfeul4/QP0hV44ZXqq1ujM8vt9lcNYbS6iPJp2pdZLP',
          'GeVOsy8jsPGYMGLqoETHAci6RRFdqxZ/GBIU0XhDj7K8UBnFuD+DeiyAzIPnW6jI',
          'gIQ5o+W6Gb+K09XbVhKRTkwJ7WMimYk=',    
        ].join(' '),
      },

      'itlab': {
        entityID:     'https://weblogin.itlab.stanford.edu/idp/shibboleth',
        description:  'Stanford IT Lab IdP V3', 
        entryPoint:   'https://weblogin.itlab.stanford.edu/idp/profile/SAML2/Redirect/SSO',
        cert:         [
          'MIIDWDCCAkCgAwIBAgIVANML/XvUeD7zIW7bXoNsT8b8AeMuMA0GCSqGSIb3DQEB',
          'CwUAMCYxJDAiBgNVBAMMG3dlYmxvZ2luLml0bGFiLnN0YW5mb3JkLmVkdTAeFw0x',
          'NjA0MTQxNjE0MjhaFw0xOTA0MTQxNjE0MjhaMCYxJDAiBgNVBAMMG3dlYmxvZ2lu',
          'Lml0bGFiLnN0YW5mb3JkLmVkdTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC',
          'ggEBAKmhnu+PZ3MQrspBdtHP9WfAMTNO/HVMepHC1J1gI4Qb98F2gjOrYRQsFRXF',
          'C1TVPWTOwGRCRJCtHa/3eazfSPmAtgeFYxVI8ekTx36fdGs5U7bmCwUHAyvR/BNc',
          '06aryhxFXQbE5EuQJIklfx+xHMonZtiibVDi/bLTu+PASxoYHQDADq58m+xCmp19',
          '8vM27VZZdRSti8O50sH56pSoQ6XzaX870tXhUvwz2UsiLse45tkGj+0RUN860wIk',
          'PZcpd66p6P39hqq8di567C4P0dqivVuVGzZbuRbxmZHoPSnaoXUO4mn0R1LcSAC/',
          'EXnluuiGtZ9d9Z58P4uhbTrn+YECAwEAAaN9MHswHQYDVR0OBBYEFAGmjjprib37',
          '9kIJJhiQZiSCnY9BMFoGA1UdEQRTMFGCG3dlYmxvZ2luLml0bGFiLnN0YW5mb3Jk',
          'LmVkdYYyaHR0cHM6Ly93ZWJsb2dpbi5pdGxhYi5zdGFuZm9yZC5lZHUvaWRwL3No',
          'aWJib2xldGgwDQYJKoZIhvcNAQELBQADggEBADkAhxnIPtzmGm7bmahl0duDRJmg',
          'SzVoXg7Tvi+6V4wY2EjPsQiAYFnS9tZZ2HJQcFP6sfA2OTgSvkxxa9epw7zyS5px',
          'erVyI6hFrvGANMPP5Zc4Lz7ZNOep5PSRw6iAogymR/kC3MdZqGFiNfX4SURyM5+M',
          'WZtUQTqF6QCNuwhULjrDcUX5uqPNvmDl9R5Q5YVmmp3xuOL7/sk3eIIcRLsCsvyA',
          '16gWQn5Q/sFRClPMwKiDD1cpdrMAw3SmIcRPbcIlYny8z1r6/u3VCSDYEeTHU+RY',
          '8fmVmw3kwBEkZS6WY7//SOR98XK/q0gXc7iigmmdvB64H3QBxlQpc9ItoTM='      
        ].join(' ')
      },

      'itlab-proxy': {
        entityID:     'https://idpproxy.itlab.stanford.edu/idp',
        description:  'Stanford IT Lab IdP Proxy',
        entryPoint:   'https://idpproxy.itlab.stanford.edu/simplesamlphp/saml2/idp/SSOService.php',
        cert:         [
          'MIIExzCCA6+gAwIBAgIJAIlmLnWM7ahWMA0GCSqGSIb3DQEBBQUAMIGdMQswCQYD',
          'VQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTERMA8GA1UEBxMIU3RhbmZvcmQx',
          'HDAaBgNVBAoTE1N0YW5mb3JkIFVuaXZlcnNpdHkxIjAgBgNVBAsTGUlUUyBFbWVy',
          'Z2luZyBUZWNobm9sb2dpZXMxJDAiBgNVBAMTG2lkcHByb3h5Lml0bGFiLnN0YW5m',
          'b3JkLmVkdTAeFw0xNTAyMDUyMTUwMzFaFw0yNTAyMDIyMTUwMzFaMIGdMQswCQYD',
          'VQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTERMA8GA1UEBxMIU3RhbmZvcmQx',
          'HDAaBgNVBAoTE1N0YW5mb3JkIFVuaXZlcnNpdHkxIjAgBgNVBAsTGUlUUyBFbWVy',
          'Z2luZyBUZWNobm9sb2dpZXMxJDAiBgNVBAMTG2lkcHByb3h5Lml0bGFiLnN0YW5m',
          'b3JkLmVkdTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKwll8zird2v',
          'd/Aw4MeAfaf3KqSQSna95iTv7/syfi7idnMtJaxlp0P/pRKv0/2xXdBN9JnskG1w',
          '6aehifa6ctEs1NpmIAliqqQ/XDiqCnAWcRrnwd/YOG6h/ShpaiVxjHkB0vuqeUjk',
          'f6MEGMha3D8EPTes7j5fzWmPCiaDYDSBAvGpetSkGvQUchKZMkOTbEjy+DS8YyqW',
          'zk3LNqeklm226gchzw/3oDazywF8GHO0G/FMEQJ42C1KDp4B/ZFOX6YN3E2nJTbB',
          'XjhiW1pqTd7HxLIDzuG09+TFeLQJKlloRiDl1cystg6nCvH7XZn1OTlILY0sJnp0',
          'FgouNKxINh8CAwEAAaOCAQYwggECMB0GA1UdDgQWBBR6uEQQsiO+envIkkU2k60y',
          'whh5BTCB0gYDVR0jBIHKMIHHgBR6uEQQsiO+envIkkU2k60ywhh5BaGBo6SBoDCB',
          'nTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFN0',
          'YW5mb3JkMRwwGgYDVQQKExNTdGFuZm9yZCBVbml2ZXJzaXR5MSIwIAYDVQQLExlJ',
          'VFMgRW1lcmdpbmcgVGVjaG5vbG9naWVzMSQwIgYDVQQDExtpZHBwcm94eS5pdGxh',
          'Yi5zdGFuZm9yZC5lZHWCCQCJZi51jO2oVjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3',
          'DQEBBQUAA4IBAQAsjvZTOZVLxLfyF2R701aPtGs1gHLbPUlLOSb89YA2DhQPy3So',
          'BUqVEb/aetgG1dhX8totMWxJO3MNKms4wb2M7AMhWA8d6j73R7juDmft+rm05b5Q',
          'm7rxgtWh9h1QM2JnzJltdzEZ4d9rr0BAH6TtAUL1HpuzCxhl1RoV4voO8YrS49JQ',
          'AlvV+vgCZJLFHfJ5306MfZZ6P6DQ/mBqwTjyydZylz9SgFSujyp5UH+xD3+pXNz0',
          'KJAxFXSc64B+9VuKSdMd1IPgWBqnQRsi2/q/OuoyKCW2Je+13w9qS0ptn3Oq5JaD',
          'TY150sbF77arIOPzWB3nlttRk1GET2htgcgx'
        ].join(' ')
      },

      'dev': {
        entityID:     'https://idp-dev.stanford.edu/',
        description:  'Stanford University Test WebAuth',
        entryPoint:   'https://idp-dev.stanford.edu/idp/profile/SAML2/Redirect/SSO',
        cert:         [
          'MIIDvTCCAqWgAwIBAgIJAJ92DcTnMwPtMA0GCSqGSIb3DQEBCwUAMHUxCzAJBgNV',
          'BAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMREwDwYDVQQHDAhTdGFuZm9yZDEf',
          'MB0GA1UECgwWQWRtaW5pc3RyYXRpdmUgU3lzdGVtczEdMBsGA1UEAwwUaWRwLWRl',
          'di5zdGFuZm9yZC5lZHUwHhcNMTQxMjAxMjE1NjQxWhcNMjQxMTMwMjE1NjQxWjB1',
          'MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTERMA8GA1UEBwwIU3Rh',
          'bmZvcmQxHzAdBgNVBAoMFkFkbWluaXN0cmF0aXZlIFN5c3RlbXMxHTAbBgNVBAMM',
          'FGlkcC1kZXYuc3RhbmZvcmQuZWR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB',
          'CgKCAQEAwV1Z6ePsQUGvrns6plDY0As6N1l2WmKIjpF7csKVILJuGrXN7A0xkMML',
          'Ib0mwHv3riL/ufsuZxeXOa4s49L3a3NYnkHfpmii1n3DduGY08sEVow7wBxs1Tu8',
          'gssE/sqNCIBY/j2CxJfLmbTgUhev95MQxgEYUE77xRLWuRnJjws/d3Azb9JBQlmu',
          'xXM7vf8BAIG/+1eunXkjRyzFphuJK+YrImI56l0gTOdTYvzsRP614sZ0YAXa4pJq',
          'phDCapXmVUJgOg8EXC9Hdlg6iN2qOzjYooH1MkpE/vyUZCkDA/rhHkumpnEgvZwD',
          'PJpe+5o4sPMBcYZsGEpMLDzprcybDQIDAQABo1AwTjAdBgNVHQ4EFgQUdX/dnGei',
          'OH0BcJCBkVlVYTK3jZkwHwYDVR0jBBgwFoAUdX/dnGeiOH0BcJCBkVlVYTK3jZkw',
          'DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEARgf8AWi+dHfGHbgrJdYL',
          '6avhaK+X5hWCecXTK7pK4ylHsetc3Os8YcyioFKN+UJ3rLfm6Ldl7M1AqgA6rNHJ',
          '/K65L4NHLnW+d8rQYqPPQNKg3uksuRBTf7OcrlVbmBOjWNoZe7SBTZ2s/rbprzdB',
          '+x0rfY9wGuTEYNpV0KYINbUIQdQbNp4Ccn4xiOuOhdAJtv/xgb4NlnRLsh3xctZ3',
          'gh1rgq2lcu8gRVrQbrCcx9EnfTK2qMKBLkdxdsWXq8j+yXZ27B7Wxvf8pH32JtIB',
          '6wRJeFBVf0B3GZtQ8aPhik245oh2HX4VuFoyeGUbzHGcS6xQRMWFrxNF2aSBW1Ld',
          '7w=='
        ].join(' '), 
      },

      'anchorage-proxy': {
        entityID:     'https://idpproxy.anchorage.stanford.edu/idp',
        description:  'Stanford Anchorage IdP Proxy',
        entryPoint:   'https://idpproxy.anchorage.stanford.edu/simplesamlphp/saml2/idp/SSOService.php',
        cert:         [
          'MIIErTCCA5WgAwIBAgIJAKdmfNS+kBmGMA0GCSqGSIb3DQEBBQUAMIGVMQswCQYD',
          'VQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTERMA8GA1UEBxMIU3RhbmZvcmQx',
          'HDAaBgNVBAoTE1N0YW5mb3JkIFVuaXZlcnNpdHkxFjAUBgNVBAsTDVVuaXZlcnNp',
          'dHkgSVQxKDAmBgNVBAMTH2lkcHByb3h5LmFuY2hvcmFnZS5zdGFuZm9yZC5lZHUw',
          'HhcNMTUwNDExMDIzODU3WhcNMjUwNDA4MDIzODU3WjCBlTELMAkGA1UEBhMCVVMx',
          'EzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFN0YW5mb3JkMRwwGgYDVQQK',
          'ExNTdGFuZm9yZCBVbml2ZXJzaXR5MRYwFAYDVQQLEw1Vbml2ZXJzaXR5IElUMSgw',
          'JgYDVQQDEx9pZHBwcm94eS5hbmNob3JhZ2Uuc3RhbmZvcmQuZWR1MIIBIjANBgkq',
          'hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyMmY5IY3zBzzp4XJe5l2gwcHwMObUWMc',
          '/q3ZqWcCUIcVMizffIPVFyNp9rxL10spMnomgM3tlrN5a0O5/lcPRlBrNwK7fXrJ',
          'Dsv7GlewERUMwWYT5dC8nUjV0MPwXo7g0ltIbQ4XHAJQEiJDbEDDY/xkuDg/fwbs',
          'De2UlSyumhYRSnbiS8MSL9+Zqp7w/1BSBgnUujc5yXSE6xU1ZuBRoqtxXg9qLDLs',
          '/zrio4BdYNHmhGEBuLG5Srj4a9QzLJtQM+4kHlrlaTk5RLIOrgLukvBU76+CBtJF',
          'ci4Zt3TM2srczGKRN/lx9Ql7MHVAbpm2bSyjnY687XuenRq3EZFD2QIDAQABo4H9',
          'MIH6MB0GA1UdDgQWBBT1+h9jZDE7JvD9Q4x2+cTzCbc4kTCBygYDVR0jBIHCMIG/',
          'gBT1+h9jZDE7JvD9Q4x2+cTzCbc4kaGBm6SBmDCBlTELMAkGA1UEBhMCVVMxEzAR',
          'BgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFN0YW5mb3JkMRwwGgYDVQQKExNT',
          'dGFuZm9yZCBVbml2ZXJzaXR5MRYwFAYDVQQLEw1Vbml2ZXJzaXR5IElUMSgwJgYD',
          'VQQDEx9pZHBwcm94eS5hbmNob3JhZ2Uuc3RhbmZvcmQuZWR1ggkAp2Z81L6QGYYw',
          'DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOCAQEArot3DOxrmEQYI9hkSX7c',
          'xWh3x64wN6NV4ASxO/L5k11/ModGUtdZaFF95BoJb3RaJRhLhdes/tKLIrrfHcTA',
          'Hw/hjQR68ysiwT1kYiu3h/tMK/89u//asGa3ZW3peUmW8cJ47C6J96K138b9ySHY',
          'yus+2etC3Ll1bgz+gQ+nIfigSzkPwbzqtsXGhUr6EOoInhayumLNutpnXV+pcm3X',
          'Ub5Z/C2npR19ZHO7I3DTU/SIUwWExEI57sNP0xW2HHM3SiHttKAtZLPfHUFFf5dL',
          '2FcA1CTcTkmGFBTzLRTLygDJCCoABf+1adn0rn8iTKLmPYW21Pb2xO2xPwyjJuQL',
          '7Q=='
        ].join(' '),
      },

      'prod': {
        entityID:     'https://idp.stanford.edu/',
        description:  'Stanford University WebAuth',
        entryPoint:   'https://idp.stanford.edu/idp/profile/SAML2/Redirect/SSO',
        cert:         [
          'MIIDnzCCAoegAwIBAgIJAJl9YtyaxKsZMA0GCSqGSIb3DQEBBQUAMGYxCzAJBgNV',
          'BAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMREwDwYDVQQHDAhTdGFuZm9yZDEU',
          'MBIGA1UECgwLSVQgU2VydmljZXMxGTAXBgNVBAMMEGlkcC5zdGFuZm9yZC5lZHUw',
          'HhcNMTMwNDEwMTYzMTAwWhcNMzMwNDEwMTYzMTAwWjBmMQswCQYDVQQGEwJVUzET',
          'MBEGA1UECAwKQ2FsaWZvcm5pYTERMA8GA1UEBwwIU3RhbmZvcmQxFDASBgNVBAoM',
          'C0lUIFNlcnZpY2VzMRkwFwYDVQQDDBBpZHAuc3RhbmZvcmQuZWR1MIIBIjANBgkq',
          'hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm6466Bd6mDwNOR2qZZy1WRZdjyrG2/xW',
          'amGEMekg38fyuoSCIiMcgeA9UIUbiRCpAN87yI9HPcgDEdrmCK3Ena3J2MdFZbRE',
          'b6fdRt76K+0FSl/CnyW9xaIlAhldXKbsgUDei3Xf/9P8H9Dxkk+PWd9Ha1RZ9Viz',
          'dOLe2S2iDKc1CJg2kdGQTuQu6mUEGrB9WJmrLHJS7GkGDqy96owFjRL/p0i9KBdR',
          'kgWG+GFHWkxzeNQ99yrQra3+C9FQXa/xLCdOY+BGOsAG7ej4094NZXRNTyXui4jR',
          'WCm2GVdIVl7YB9++XSntS7zQEJ9QBnC1D4bS0tljMfdOGAvdUuJY7QIDAQABo1Aw',
          'TjAdBgNVHQ4EFgQUJk4zcQ4JupEcAp0gEkob4YRDkckwHwYDVR0jBBgwFoAUJk4z',
          'cQ4JupEcAp0gEkob4YRDkckwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOC',
          'AQEAKvf9AO4+osJZOmkv6AVhNPm6JKoBSm9dr9NhwpSS5fpro6PrIjDZDLh/L5d/',
          '+CQTDzuVsw3xwDtlm89lrzbqw5rSa2+ghJk79ijysSC0zOcD6ka9c17zauCNmFx9',
          'lj9iddUw3aYHQcQRktWL8pvI2WCY6lTU+ouNM+owStya7umZ9rBdjg/fQerzaQxF',
          'T0yV3tYEonL3hXMzSqZxWirwsyZ0TnhWJsgEnqqG9tCFAcFu2p+glwXn1WL2GCRv',
          'BfuJMPzg7ZB419AEoeYnLktqAWiU+ISnVfbwFOJ+OM/O7VQOeHDm2AeYcwo12CAc',
          '4GC9KWTs3QtS3GREPKYDlHRNxQ=='
        ].join(' '),
      }
    };

// entityID as alias
Object.keys(idps).forEach(function (k) {
  var idp = idps[k],
      hostname = url.parse(idp.entityID).hostname;

  idps[idp.entityID] = idp;
  idps[hostname] = idp;
  idps[hostname.replace(/\.stanford\.edu$/, '')] = idp;
});

module.exports = idps;