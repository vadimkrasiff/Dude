import { Button } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { setPortionPage } from "../redux/users-reducer";
import css from "./Paginator.module.css"

let Paginator = ( {totalCount, setCurrentPage, currentPage, count = 20, portionPage, setPortionPage}) => {



    const countPage = Math.round(totalCount/count);
    let pages = [];
    for(let i = 1; i <=countPage; i++) {
        pages.push(i);
    }


    let [portion, setPortion] = useState(portionPage);

    const leftClick = () => {
        
        setPortion(portion - 20)
        setPortionPage(portion+20)
        setCurrentPage(portion-39)
    }

    const rightClick = () => {
        setPortion(portion + 20)
        setPortionPage(portion+20)
        setCurrentPage(portion)
    }


    

    return <div className={css.paginator}>
        {portion-20 > pages[0] ? <Button className={css.button} type="primary" onClick={leftClick} >Last</Button> : null}
        {pages.map((el)=>{
            if(el >= portion-20 && el <= portion)
            return <div className={currentPage == el ? css.activePage :css.page} onClick={()=>setCurrentPage(el)}>
            {el}
        </div>})}
        {portion < pages[pages.length -1] ? <Button className={css.button} type="primary" onClick={rightClick} >Next</Button> : null}
    </div>
}

export default Paginator;