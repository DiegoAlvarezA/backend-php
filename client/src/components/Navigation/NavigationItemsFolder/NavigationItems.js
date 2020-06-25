import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul >
        <NavigationItem link="/" exact>Home</NavigationItem >
        <NavigationItem link="/list" >List Products</NavigationItem >
        <NavigationItem link="/save" >Save Product</NavigationItem >
    </ul>
);

export default navigationItems;