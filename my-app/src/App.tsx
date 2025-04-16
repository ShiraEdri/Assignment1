
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';




export default function App(){
  const NOTES_URL = 'http://localhost:3001/notes'
  const POSTS_PER_PAGE = 10
  const [activePage, setActivePage] = useState(1);
  const [notes, setNotes] = useState([]);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.get(NOTES_URL, {
      params: {
        _limit: 0
      }})
      .then(response => {
        
        setTotalPages(Math.ceil(response.headers['x-total-count'] / POSTS_PER_PAGE));
        console.log('Fetched notes:', response.data, totalPages);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  useEffect(() => {
    const promise = axios.get(NOTES_URL, {
        params: {
          _page: activePage,
          _limit: POSTS_PER_PAGE
        }});  
    promise.then(response => { 
        // fill
        console.log("response found")
        setNotes(response.data);  // Store the data in state
    }).catch(error => {console.log("Encountered an error:" + error)});
  }, [activePage]);

  return(
    <>
      <div>
        <NotesList notes={notes} /> 
      </div>
      <div>
        <Pagination activePage = {activePage} totalPages = {totalPages} setActivePage = {setActivePage}/>
      </div>
    </>  
  );

}



function NotesList({notes}) {
  return (
    <div>
      {notes.map((note, i) => (
        <Note key={i} i={i} notes={notes} />
      ))}
    </div>
  );
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




function PageButton({i , handleClick , activePage}){
  return(
    <>
      <button className="button" style={{ fontWeight: activePage === i ? 'bold' : 'normal' }} disabled = {activePage == i} onClick = {() => handleClick(i)}>{i}</button>
  </>);
}


function PageNumberButtons({totalPages, activePage, setActivePage}){
  if (totalPages <= 5 ){
    return (
      <>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            i={i + 1}
            handleClick={setActivePage}
            activePage={activePage}
          />
        ))}
      </>
    );
  }
  else{
    return;
  }
}

function Pagination({activePage , totalPages, setActivePage}){

  return(
  <div>
    <button name="first" disabled = {activePage==1} onClick = {() => setActivePage(1)}>First</button>
    <button name="previous" disabled = {activePage==1} onClick = {() => setActivePage(n => n-1)}>Previous</button>
    <PageNumberButtons totalPages={totalPages} activePage={activePage} setActivePage={setActivePage}/>
    <button name="next" disabled = {activePage==totalPages} onClick = {() => setActivePage(n => n+1)}>Next</button>
    <button name="last" disabled= {activePage==totalPages} onClick = {() => setActivePage(totalPages)}>Last</button>
</div>);
  }




