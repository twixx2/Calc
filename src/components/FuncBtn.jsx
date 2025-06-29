import '../assets/style/main.scss';


const FuncBtn = ({ symbol, onClick }) => {

    return (
        <button className="func_button" onClick={onClick}>
            <span>{symbol}</span>
        </button>
    );
}

export default FuncBtn;