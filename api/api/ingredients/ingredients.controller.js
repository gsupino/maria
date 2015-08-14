'use strict';
import {ingredientService} from '../../services/ingredients';
import co from 'co';


export function find(req, res) {
    co(function*() {
        try {
            let ingredients = yield ingredientService.find();
            res.send(ingredients);

        } catch (e) {
            res.status(401).send(e);
        }

    })
};

export function read(req, res) {
    co(function*() {
        try {
            let id = req.params.id;
            id=id.toString();
 
            let ingredients = yield ingredientService.read(id);
            res.send(ingredients);

        } catch (e) {
            res.status(401).send(e);
        }

    })
};

export function create(req, res) {
    co(function*() {
        try {
            let ingredients = yield ingredientService.create(req.body);
            res.send(ingredients);
        } catch (e) {
            res.status(401).send(e);
        }
    })
};

export function update(req, res) {
    co(function*() {
        try {
            let id = req.params.id;
            let ingredients = yield ingredientService.update(id, req.body);
            res.send(ingredients);

        } catch (e) {
            res.status(401).send(e);
        }
    })
};

export function remove(req,res){


};

export function getDescription(req, res) {
    co(function*() {
        try {
            let ingredients = yield ingredientService.getDescription();
            res.send(ingredients);

        } catch (e) {
            res.status(401).send(e);
        }

    })
};

