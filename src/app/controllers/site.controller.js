const siteController = () => {};

// [GET] /
siteController.index = async (req, res) => {
    res.render('./pages/default/index', {
        pageTitle: 'Trang chủ',
        style: '/pages/default/index.css',
        script: '/pages/default/index.js',
        layout: 'customer',
    });
};

module.exports = siteController;
