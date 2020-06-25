import React from 'react';

const product = (props) => {

    const removeProduct = () => {
        fetch('http://localhost/rest/product.php?id=' + props.obj.id,
            { method: 'DELETE' })
            .then(response => props.removeProduct(props.obj.id))
    }

    return (
        <tr>
            <td>{props.obj.id}</td>
            <td>{props.obj.name}</td>
            <td>{props.obj.reference}</td>
            <td>{props.obj.price}</td>
            <td>{props.obj.weight} g</td>
            <td>{props.obj.category}</td>
            <td>{props.obj.stock}</td>
            <td>{props.obj.created_at}</td>
            <td>{props.obj.last_sale}</td>
            <td><button type="button" onClick={removeProduct} >Eliminar</button></td>
        </tr>
    );

}

export default product;