import { colors } from "../../styles/theme";

export default function Button ({children, onClick}){
    return(
        <>
            <button onClick={onClick}>{children}</button>
            <style jsx>
            {
                `
                button{
                    align-items: center;
                    color:#fff;
                    display: flex;
                    background:${colors.black};
                    border:0;
                    cursor: pointer;
                    font-size: 15px;
                    border-radius: 9999px;
                    font-weight: 800;
                    padding: 8px 24px;
                    transition: opacity .3s ease;
                }

                button > :global(svg){
                    margin-right:9px;
                }

                button:hover{
                    opacity: 0.7;
                }
                `
            }
            </style>
        </>
        
    )
}