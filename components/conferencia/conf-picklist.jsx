// Componentes necessarios da pagina de conferencia relacionado ao picklist.


const ItemTamplate = (item) => {
    return (
        <div className="product-item">
            <div className="product-list-detail">
                <h5 className="mb-2">Pedido: {item[0]} | Nota: {item[1]}</h5>
            </div>
        </div>
    );
}


export {
    ItemTamplate
}
