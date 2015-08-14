'use strict';
import {recipeService} from '../../services/recipes';
import co from 'co';


export function find(req, res) {
    co(function*() {
        try {
            let recipe = yield recipeService.find();
            res.send(recipe);

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
 
            let recipe = yield recipeService.read(id);
            res.send(recipe);

        } catch (e) {
            res.status(401).send(e);
        }

    })
};

export function create(req, res) {
    co(function*() {
        try {
            let recipe = yield recipeService.create(req.body);
            res.send(recipe);
        } catch (e) {
            res.status(401).send(e);
        }
    })
};

export function update(req, res) {
    co(function*() {
        try {
            let id = req.params.id;
            let recipe = yield recipeService.update(id, req.body);
            res.send(recipe);

        } catch (e) {
            res.status(401).send(e);
        }
    })
};

export function remove(req,res){


};


