const filterReducer = (state = '', event) => {
    switch(event.type){
    case 'SETFILTER': return event.filter
    default: return state
    }
  }
  
  export const setFilter = filter => ({
    type: 'SETFILTER',
    filter
  })
  
  export default filterReducer