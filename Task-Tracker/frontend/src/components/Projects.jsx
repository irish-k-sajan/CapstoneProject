export default function Projects(){

    const projects=[
         {
                    "name":"project1",
                    "description":"This is project 1",
                    "start-date":"19-11-2024",
                    "end-date":"19-11-2024",
                    "owner":"appus"
        },
         {
                    "name":"project2",
                    "description":"This is project 2",
                    "start-date":"19-11-2025",
                    "end-date":"19-11-2025",
                    "owner":"irish"
        }
    ];
    return (<>
    <div>
        <ul>
            {projects.map((data,index)=><li key={index}>{data["name"]}</li>)}
        </ul>
    </div>
    </>);
}