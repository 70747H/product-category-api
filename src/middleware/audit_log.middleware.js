const models = require('../database/models');

const AuditLogPos = models.audit_log_pos;

function auditlog(req, res, next) {
  const oldSend = res.send;

  res.send = function (data) {
    const auditLog = {
            endpoint: req.path,
            type: req.method,
            headers: JSON.stringify(req.headers),
            params: JSON.stringify(req.params),
            query: JSON.stringify(req.query),
            request: req.body,
            response: data
        };

    if (req.path === '/authentication/administrator/login')
      delete auditLog.request.password;
    if (req.user) {
      auditLog.laundry_id = req.user.laundry_id || null;
      auditLog.laundry_branch_id = req.user.laundry_branch_id || null;
    } else {
      auditLog.laundry_id = null;
      auditLog.laundry_branch_id = null;
    }
    if (req.headers) {
      auditLog.advertising_id = req.headers.advertising_id || null;
      auditLog.app_version = req.headers.app_version || null;
    }
    if (res.statusCode !== 429)
      AuditLogPos.create(auditLog);

    oldSend.apply(res, arguments);
  };

  next();
}

module.exports = auditlog;
