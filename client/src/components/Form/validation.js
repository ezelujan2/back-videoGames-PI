export default function validate (prop, value){
    if(prop === 'name'){
        const regex = /^[a-zA-Z0-9\s]+$/;
        if(value === '') return 'No deje este campo vacio'
        if (regex.test(value)) return ''
        else return 'Solo Numeros o Letras'
    }
    else return ""
}