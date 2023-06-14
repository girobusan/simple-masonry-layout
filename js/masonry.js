window.masonry = {

  colsNow: 0,

  init: function(p){

    const M = window.masonry;
    if(document.readyState=="loading")
    {
      window.addEventListener("DOMContentLoaded" , ()=>M.setup(p) )
    }else{
      M.setup(p)
    }
  },

  setup: function(props){ 
     console.info("Init Masonry...")
     const M = window.masonry;
     if(!props.container){ return }
     if(!props.children){ M.childSelector=props.container + " > *" }
     else{ M.childSelector = props.children }
     if(!props.columnClass){ window.masonry.columnClass="col" }
     if(!props.countFn){ window.masonry.count = function(){ return 2 } }
     else { M.count = ()=>props.countFn(M.container) }
     //
     //find container
     M.container =   document.querySelector(props.container);
     M.container.setAttribute("class" , "masonryWatched")
     if(!M.container){ console.info("no container found") ; return }
     //
     //gather childs
     M.items = Array.from( M.container.querySelectorAll(M.childSelector) );
     // console.log(M.items)
     //
     //add listener
     window.addEventListener("resize", M.doColumns)
     M.doColumns();
     
     
  },

  doColumns: function(){
     const M = window.masonry;
     //how many columns do we need?
     const cn = M.count();
     if(cn==M.colsNow){ return; }
     //start working
     console.info("required columns:" , cn)
     window.removeEventListener("resize", M.doColumns)
     if(cn>M.items.length){ M.colsNow = M.items.length ; return M.items.length }
     //count lengths of columns
     //shortest 
     const shrt = Math.floor( M.items.length/cn );
     //remainder (number of longer columns)
     const cleft = M.items.length - ( shrt * cn );
     const colElements = new Array(cn);

     for ( i = 0 ; i < cn ; i++ ){
        const thisColLength = shrt + ( i < cleft ? 1 : 0 )
        const cElement = document.createElement("div");
        colElements[i] = cElement;
        cElement.setAttribute("class" , M.columnClass);

        for( y = 0 ; y < thisColLength ; y++ ){

           cElement.appendChild( M.items[ i + (y*cn ) ]  )
        }     
     }

     //append
     M.container.innerHTML = "";
     colElements.forEach( e=>M.container.appendChild(e) );
     M.colsNow = cn;
     //throttle
     window.setTimeout(()=>{ 
        window.addEventListener("resize", M.doColumns) 
        } , 300)
     
  }

}
