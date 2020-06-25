import React from 'react';
import Product from '../Product/Product';

class Checkout extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        fetch('http://localhost/rest/product.php')
            .then(response => response.json())
            .then(data => this.setState({ products: data }));
    }

    removeProduct = (id) => {
        this.setState(prevState => {
            return { products: prevState.products.filter(el => el.id !== id) };
        });
    }

    render() {
        const products = this.state.products
            .map(product => <Product key={product.id} obj={product} removeProduct={this.removeProduct} />)
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>reference</th>
                            <th>price</th>
                            <th>weight</th>
                            <th>category</th>
                            <th>stock</th>
                            <th>created_at</th>
                            <th>last_sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default Checkout;