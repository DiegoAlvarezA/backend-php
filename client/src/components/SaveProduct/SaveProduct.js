import React from 'react';
import classes from './SaveProduct.css';

class SaveProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            showMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    };

    componentWillUnmount() {
        console.log('will unmount');
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        for (const field of ['name', 'reference', 'price', 'weight', 'category', 'stock']) {
            if (!fields[field]) {
                formIsValid = false;
                errors[field] = "Cannot be empty";
            }
        }

        for (const field of ['price', 'weight', 'stock']) {
            if (!isFinite(fields[field])) {
                formIsValid = false;
                errors[field] = "Only numbers";
            }
            if (field <= 0) {
                formIsValid = false;
                errors[field] = "Quantity is less than or equal to zero";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    submitForm(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            let fields = {};
            fields['name'] = "";
            fields['reference'] = "";
            fields['price'] = "";
            fields['weight'] = "";
            fields['category'] = "";
            fields['stock'] = "";
            this.setState({ fields: fields, showMessage: true });
            const data = new FormData(event.target);
            fetch('http://localhost/rest/product.php', {
                method: 'POST',
                body: data,
            });
        }
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ fields, showMessage: false });
    }

    errors = () => {
        let errors = [];
        for (const error in this.state.errors) {
            errors.push(<li key={error}>{error}: {this.state.errors[error]}</li>)
        };
        return (
            <ul >
                {errors}
            </ul>
        );
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Save a new product</h4>
                {this.state.showMessage ? <h6>Product saved!</h6> : null}
                {this.errors()}
                <form name="form" onSubmit={this.submitForm} >
                    <div className={classes.container}>
                        <div className={classes.form_group}>
                            <label>Name:</label>
                            <input type="text" name="name" value={this.state.fields.name} required onChange={this.handleChange} />
                        </div>
                        <div className={classes.form_group}>
                            <label>Reference:</label>
                            <input type="text" name="reference" value={this.state.fields.reference} required onChange={this.handleChange} />
                        </div>
                        <div className={classes.form_group}>
                            <label>Price:</label>
                            <input type="text" name="price" value={this.state.fields.price} required onChange={this.handleChange} />
                        </div>
                        <div className={classes.form_group}>
                            <label>Weight:</label>
                            <input type="text" name="weight" value={this.state.fields.weight} required onChange={this.handleChange} />
                        </div>
                        <div className={classes.form_group}>
                            <label>Category:</label>
                            <input type="text" name="category" value={this.state.fields.category} required onChange={this.handleChange} />
                        </div>
                        <div className={classes.form_group}>
                            <label>Stock:</label>
                            <input type="text" name="stock" value={this.state.fields.stock} required onChange={this.handleChange} />
                        </div>
                        <input type="submit" value="Save" />

                    </div>
                </form>
            </div>
        )
    }
};

export default SaveProduct;