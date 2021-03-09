const headers = {
  device_id: 'jdlskfhj4h5k4353',
  device_type: 'android',
  app_version: '3.2.1',
  'Content-Type': 'application/json',
  country_id: 1,
  group_id: 1
};

function mockRequest() {
  const req = {};
  req.headers = headers;
  req.params = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req);
  req.body = jest.fn().mockReturnValue(req);
  return req;
}

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

module.exports = {
  mockRequest,
  mockResponse
};
