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

      'dev': {
        entityID:     'https://idp-dev.stanford.edu/',
        description:  'Stanford University Development IdP',
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

      'uat': {
        entityID:     'https://idp-uat.stanford.edu/',
        description:  'Stanford University UAT IdP',
        entryPoint:   'https://idp-uat.stanford.edu/idp/profile/SAML2/Redirect/SSO',
        cert:         [
          'MIIDzDCCArQCCQCdJebZPEsQBzANBgkqhkiG9w0BAQsFADCBpzELMAkGA1UEBhMC',
          'VVMxEzARBgNVBAgMCkNhbGlmb3JuaWExETAPBgNVBAcMCFN0YW5mb3JkMRwwGgYD',
          'VQQKDBNTdGFuZm9yZCBVbml2ZXJzaXR5MTMwMQYDVQQLDCpBdXRoZW50aWNhdGlv',
          'biBhbmQgQ29sbGFib3JhdGlvbiBTb2x1dGlvbnMxHTAbBgNVBAMMFGlkcC11YXQu',
          'c3RhbmZvcmQuZWR1MB4XDTE2MDUyMzIwMTIxMVoXDTI2MDUyMTIwMTIxMVowgacx',
          'CzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMREwDwYDVQQHDAhTdGFu',
          'Zm9yZDEcMBoGA1UECgwTU3RhbmZvcmQgVW5pdmVyc2l0eTEzMDEGA1UECwwqQXV0',
          'aGVudGljYXRpb24gYW5kIENvbGxhYm9yYXRpb24gU29sdXRpb25zMR0wGwYDVQQD',
          'DBRpZHAtdWF0LnN0YW5mb3JkLmVkdTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC',
          'AQoCggEBAJlkwhaVvmjhW6EGIATvco0UQntR1p9+XneAU7z08j3CLyjgb5n7qTgn',
          '3piZmENA0y3aD9cvIZ6ixYN8oCGfPTjwMr488cCQsBkvXCoA4O1XThvPsdd5KjQX',
          'y8IAsno6qrYsfeS+nlMgeJhHVPRRFkos+JUs0LGYHK/vZdMpIVYhDbH3udwjMP9O',
          'Qf4h1HCr4zy2n/XWg3GO9AyKq50ibTogOZy0wQr7gp1+l5RW0hXG1IYShbu57MaI',
          'TtsUZUMUJZGGGeEBYANWelJ8TnXvOJt0ZqLeULJSgCS8EyKQM4Ty5Qy7cbTVN8zP',
          'aPne4smCvpeAHxyaCqx3z6XXBgKutDcCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEA',
          'DxXtRxiUAd9brr55fv0gxMFNTE7ayZh5BWFgukOvMyS0H1ces7NmiqoDJR3uMc7P',
          '1zdudiAoO4tlRGnMm9FA5eE8Rhm8WEPvwdaGcoiIu80yPXPHWx+7sBy4mAc4llrO',
          'AYwCbXM0E6jLh4Y068j+mLmzYzkW6Ro7mImTyGNYNWJUr3jP+79m6Fr0QbC44Giz',
          'S4UszE26axYpmhs2ONQFsOBs1VazgNt/LJfgQXK3MpdRct2vOMIeHSJAw6lJ1rfc',
          'CoS3z3uvz7LPaJdw4ZyDC9i0bQoKvfpi96pOnsc2TE/MMo3JbG2vW8g0G3f9xv5O',
          'PzwNr2FQZzZfjH0wg9dMfQ=='
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