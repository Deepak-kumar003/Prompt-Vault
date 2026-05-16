import { Link } from "react-router-dom";
import { useState } from "react";

const getTime = (date) => {

}

const DashboardCard = ({prompt}) => {

    const [copy, setCopy] = useState(false)

    const handleCopy = async () => {
        try{
            await navigator.clipboard.writeText(prompt.promptTemplate);
            setCopy(true)

            setTimeout(() => {
                setCopy(false)
            }, 2000);

            await fetch('http://localhost:5000/api/prompt/:id/copy', {
                method: 'POST'
            });

        }
        catch(err){
            console.log(`error copying the prompt: ${err.message}`);
        }
    }
    
    return(
        <Link className="bg-vault-card border border-vault-border rounded-xl p-5 flex justify-between items-start hover:border-vault-textMuted transition-colors group cursor-pointer">
            <div className="flex-1 pr-6">
                <h1>{prompt.title}</h1>
                <p>{prompt.description}</p>
                <p>{prompt.tags}</p>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
                <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 border border-vault-border rounded-md text-vault-textMain text-sm hover:bg-vault-bg transition-colors">
                    {copy ? (
                        <span>copied</span>
                    ):(
                        <span>copy</span>
                    )}
                </button>
                <p>{prompt.updatedAt}</p>
            </div>
        </Link>
    );
}

export default DashboardCard