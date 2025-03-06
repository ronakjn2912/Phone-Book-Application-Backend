

const errorFormatter = (err) =>{
    return{
        success : false,
        message : err.message,
        status: 'error',
        details: err.extensions
    }
}

module.exports = errorFormatter


//including stack trace in error response is not production recommended practice, as it exposes extra code information
//GraphQL adds stackTrace by default, to remove it explicitly, filter stackTrace or tailor fields of extension for each error differently 