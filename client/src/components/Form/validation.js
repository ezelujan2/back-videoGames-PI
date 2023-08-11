export default function validate (prop, value, genres){
    if(prop === 'name'){
        const regex = /^[a-zA-Z0-9\s]+$/;
        if(value === '') return "Name can't be empty"
        if (regex.test(value)) return ''
        else return 'Only numbers and letters supported'
    }
    if(prop === 'rating'){
        if(value === '') return "Rating can't be empty"
        const numero = +value
        if(isNaN(numero)) return 'Rating must be a valid number'
        else if( numero < 0 || numero > 5) return "Number has to be between 0-5"
        else return ""
    }
    else return ""
}