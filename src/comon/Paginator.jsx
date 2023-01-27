import React from "react"

let Paginator = ({totalCount, currentPage, requestGet, pageSize=20}) => {
    const pagesCount = Math.ceil(totalCount / pageSize);
    const pages = [];
    for(let i = 1; i<= pagesCount; i ++)
    pages.push(i);

    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div>

    </div>
}

export default Paginator;