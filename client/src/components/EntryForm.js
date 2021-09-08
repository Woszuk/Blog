import React from 'react';
import { Field, reduxForm } from 'redux-form'

import './EntryForm.scss';

class EntryForm extends React.Component {
    renderError({ error, touched }) {
        if(touched && error) {
            return (                
                <div className="error">{error}</div>            
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        return (
            <label className="form__label">
                <span className="form__span">{label}</span>
                <input className={`${meta.error && meta.touched ? 'form__error' : ''}`} {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </label>
        )
    }

    renderTextarea =  ({ input, label, meta }) => {
        return (
            <label className="form__label">
                <span className="form__span">{label}</span>
                <textarea {...input} className={`form__textarea ${meta.error && meta.touched ? 'form__error' : ''}`} autoComplete="off"/>
                {this.renderError(meta)}
            </label>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
                <Field name="title" component={this.renderInput} label="Title" />
                <Field name="content" component={this.renderTextarea} label="Content" />
                <button className="btn">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {};
    if(!formValues.title || formValues.title.length <=2) {
        errors.title = 'Title should be at least 3 characters long!'
    }

    if(!formValues.content) {
        errors.content = 'You must enter a content!'
    }

    return errors
}

export default reduxForm({
    form: 'entryForm',
    validate
})(EntryForm);