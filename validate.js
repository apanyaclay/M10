
exports.create = function(req, res, next) {
    const product_name = req.body.product_name,
        product_price = req.body.product_price
    if (!product_name || product_name===null) {
        return res.status(404).json({status: 404, message: "product_name is require"})
    }
    if (!product_price || product_price===null) {
        return res.status(404).json({status: 404, message: "product_price is require"})
    }
    if (isNaN(product_price)) {
        return res.status(404).json({status: 404, message: "product_price wajib diisi dengan angka"})
    }
    if (product_price <= 0) {
        return res.status(404).json({status: 404, message: "product_price tidak boleh <=0"})
    }
    req.products = [product_name, product_price]
    next()
}

exports.userAdd = function(req, res, next) {
    const {user_name, user_email, user_address, user_phone} = req.body
    // cek apakah ada data yang belum terisi
    if (!user_name) {
        return res.status(404).json({status: 404, message: "user_name is require"})
    }
    if (!user_email) {
        return res.status(404).json({status: 404, message: "user_email is require"})
    }
    if (!user_address) {
        return res.status(404).json({status: 404, message: "user_address is require"})
    }
    if (!user_phone) {
        return res.status(404).json({status: 404, message: "user_phone is require"})
    }
    req.user = {user_name, user_email, user_address, user_phone}
    next()                                                
}
