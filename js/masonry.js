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

     M.childSelector = props.children || props.container + " > *";
     M.columnClass = props.columnClass || "col" 
     M.count = props.countFn ? ()=>props.countFn(M.container) : ()=>2 

     //find container
     M.container =   document.querySelector(props.container);
     if(!M.container){ console.info("no container found") ; return }
     M.container.setAttribute("class" , "masonryWatched")
     //gather childs
     M.items = Array.from( M.container.querySelectorAll(M.childSelector) );
     //add listener
     window.addEventListener("resize", M.doColumns)
     M.doColumns();
  },

  doColumns: function(){
     const M = window.masonry;
     //how many columns do we need?
     const cn = Math.min( M.count() , M.items.length);
     if(cn==M.colsNow){ return; }
     //start working
     window.removeEventListener("resize", M.doColumns)
     console.info("required columns:" , cn)
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
        window.addEventListener("resize", M.doColumns);
        M.doColumns();
        } , 300)
     
  }

}
