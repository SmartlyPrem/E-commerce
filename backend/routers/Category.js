const { Router } = require('express');
const CategoryController = require('../controllers/Category');
const fileUpload = require('express-fileupload');

const CategoryRouter = Router();

CategoryRouter.post(
    "/create",
    fileUpload({
        createParentPath: true
    }), //middleware
    (req, res) => {
        const result = new CategoryController().create(req.body, req.files.image);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)

CategoryRouter.get(
    "/get-data/:id?",
    (req, res) => {
        const result = new CategoryController().getData(req.params.id);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)

CategoryRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new CategoryController().delete(req.params.id);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (err) => {
                res.send(err)
            }
        )
    }
)

CategoryRouter.patch(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new CategoryController().changeStatus(req.params.id, req.params.new_status);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (err) => {
                res.send(err)
            }
        )
    }
)

CategoryRouter.put(
    "/update/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        let image = null;
        if (req.files?.image) {
            image = req.files.image;
        }
        const result = new CategoryController().update(req.params.id, req.body, image)
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (err) => {
                res.send(err)
            }
        )
    }
)

module.exports = CategoryRouter;