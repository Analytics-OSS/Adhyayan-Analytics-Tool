import React, { Component } from 'react'
import './ContactForm.css'

export default class ContactForm extends Component {
    constructor(props){
        super(props)
        this.state = { name :'',
                       email : '',
                       message :''}
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    render() {
        return (
            <div>
                {/* <form id="contactform"> 
                    <h1 className="title">Contact Us</h1>
                    <div className="formgroup">
                        <label for="name">Name: </label>
                        <input
                        className="forminputs" 
                        id="name" 
                        name="name" 
                        placeholder="Enter your name"
                        value={this.state.name}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="formgroup">
                        <label for="email">Email: </label>
                        <input
                        className="forminputs" 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email"
                        value={this.state.email} 
                        onChange={this.handleChange}
                        required/>
                    </div>
                    <div className="formgroup">
                        <label for="message">Message:</label>
                        <textarea 
                        className="forminputs" 
                        name="message" 
                        id="message" 
                        placeholder="Enter your Message..." 
                        value={this.state.message}
                        onChange={this.handleChange}
                        required />
                    </div>
                    <button id="submit" className="submitbutton">Hola!</button>
        </form> */ }
        <div class="container">  
            <form id="contact" action="" method="post">
                <h3>Contact Us</h3>
                <fieldset>
                <input placeholder="Your name" type="text" tabindex="1" required autofocus/>
                </fieldset>
                <fieldset>
                <input placeholder="Your Email Address" type="email" tabindex="2" required/>
                </fieldset>
                <fieldset>
                <textarea placeholder="Type your Message Here...." tabindex="3" required></textarea>
                </fieldset>
                <fieldset>
                <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                </fieldset>
            </form>
        </div>
    </div>
        )
    }
}
