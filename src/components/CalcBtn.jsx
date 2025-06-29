import '../assets/style/main.scss';


const CalcBtn = ({ symbol, onClick, bg }) => {

    const className = `calc_button ${bg === "orange" ? "orange" : bg === "gray" ? "gray" : "dark"
        }`

    return (
        <button className={className} onClick={onClick}>
            <span>{symbol}</span>
        </button>
    );
}

export default CalcBtn;