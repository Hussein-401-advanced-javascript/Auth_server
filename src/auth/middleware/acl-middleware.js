module.exports = (capability) => {
  return (req, res, next) => {
    console.log('req.userreq.user',req.user.tokenObject.capabilities);
    try {
      if (req.user.tokenObject.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied!!');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};