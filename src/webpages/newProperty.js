import React, { Component } from 'react';
class newProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property_Name: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            listing_Name: ' ',
            listing_Date: '',
            price: '0',
            is_Active: 'true'
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    makeUrl() {
        let data = "?"
        data += encodeURIComponent('property_Name') + '=' + encodeURIComponent(this.state.property_Name) + "&";
        data += encodeURIComponent('address1') + '=' + encodeURIComponent(this.state.address1) + "&";
        data += encodeURIComponent('address2') + '=' + encodeURIComponent(this.state.address2) + "&";
        data += encodeURIComponent('city') + '=' + encodeURIComponent(this.state.city) + "&";
        data += encodeURIComponent('state') + '=' + encodeURIComponent(this.state.state) + "&";
        data += encodeURIComponent('is_Active') + '=' + encodeURIComponent(this.state.is_Active) + "&";
        data += encodeURIComponent('listing_Name') + '=' + encodeURIComponent(this.state.listing_Name) + "&";
        data += encodeURIComponent('listing_Date') + '=' + encodeURIComponent(this.state.listing_Date) + "&";
        data += encodeURIComponent('price') + '=' + encodeURIComponent(this.state.price);
        return data;
    }


    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        fetch("http://localhost:8080/newProperty" + this.makeUrl())//,
        window.location.href = '/'
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Add a new property</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Property Name: <input type="text" name="property_Name" value={this.state.property_Name} onChange={this.onInputchange}></input></label><br></br>
                    <label>Address1:&ensp; &emsp;&emsp;<input type="text" name="address1" value={this.state.address1} onChange={this.onInputchange}></input></label><br></br>
                    <label>Address2:&emsp; &ensp;&emsp;<input type="text" name="address2" value={this.state.address2} onChange={this.onInputchange}></input></label><br></br>
                    <label>City:&emsp;&emsp;&emsp;&emsp;&emsp; <input type="text" name="city" value={this.state.city} onChange={this.onInputchange}></input></label><br></br>
                    <label>State: &emsp;&emsp; &emsp;&emsp;<input type="text" name="state" value={this.state.state} onChange={this.onInputchange}></input></label><br></br>
                    <label>Is Active: &emsp;&emsp;&emsp;<select name="is_Active" value={this.state.is_Active} onChange={this.onInputchange}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select></label><br></br>
                    <label>Listing Name:&emsp;<input type="text" name="listing_Name" value={this.state.listing_Name} onChange={this.onInputchange}></input></label><br></br>
                    <label>Listing Date: &emsp; <input type="date" name="listing_Date" value={this.state.listing_Date} onChange={this.onInputchange}></input></label><br></br>
                    <label>Price:&emsp; &emsp; &emsp;&emsp;<input type="text" name="price" value={this.state.price} onChange={this.onInputchange}></input></label><br></br>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={event => window.location.href = '/'}>Back</button>
            </div >
        );

    }
}
export default newProperty;