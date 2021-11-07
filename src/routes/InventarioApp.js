import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AgregarCategoria } from '../components/categoria/AgregarCategoria';
import { Categoria } from "../components/categoria/Categoria";

// aqui van a ir las rutas

export const InventarioApp = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ Categoria } />
                <Route exact path='/agregar' component={ AgregarCategoria } />
            </Switch>
        </BrowserRouter>
    )
}
