/* eslint camelcase: 0 */
module.exports = () => {
  const fn1_20170201 = (req, res) => {
    res.status(200).send({ message: 'fn1_20170201 called' });
  };

  const updateVersions = (versions) => {
    versions.push({
      release: new Date('2017-02-01').getTime(),
      endpoints: [
        { url: '/fn1', method: 'GET', func: fn1_20170201 }
      ]
    });
  };

  return { updateVersions };
};
