
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';




export default function App(){
  const NOTES_URL = 'http://localhost:3001/notes'
  const POSTS_PER_PAGE = 10
  const [activePage, setActivePage] = useState(1);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const promise = axios.get(NOTES_URL, {
        params: {
          _page: activePage,
          _limit: POSTS_PER_PAGE
        }});
    promise.then(response => { 
        // fill
        console.log("response found")
        //setActivePage(n => n+1)
        setNotes(response.data);  // Store the data in state
    }).catch(error => {console.log("Encountered an error:" + error)});
  }, [activePage]);

  return(
      <div>
        <Note i={1} notes={notes} /> 
      </div>

  );
  // <Note i = {activePage} notes = {notes} />
  //<Pagination activePage={activePage} totalPages={100} setActivePage={setActivePage}/>
}

function Note({i, notes}){
  
  if (!notes[i]) return <div>Loading note...</div>;

  return (
    <div className="note" id={String(i)}>
      <h2>{notes[i].title}</h2>
      <small>By Author {notes[i].author.name}</small>
      <br />
      {notes[i].content}
    </div>
  );

}

function Pagination({activePage , totalPages, setActivePage}){
  return(
  <div>
    <button name="first" disabled = {activePage==1} onClick = {() => setActivePage(1)}>First</button>
    <button name="previous" disabled = {activePage==1} onClick = {() => setActivePage(n => n-1)}>Previous</button>
    <button name="next" disabled = {activePage==totalPages} onClick = {() => setActivePage(n => n+1)}>Next</button>
    <button name="last" disabled= {activePage==totalPages} onClick = {() => setActivePage({totalPages})}>Last</button>
</div>);
}



