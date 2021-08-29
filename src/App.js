import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './Components/MovieRoww';
import FeaturedMovie from './Components/FeaturedMovie';
import Header from './Components/Header';



export default () => {
    const [moveList, setMoveList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [BlackHeader, setBlackHeader] = useState(false);

    useEffect(()=>{
        const loadALL =  async () => {
            let List = await Tmdb.getHomeList();
            setMoveList(list);

            let orinals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
            let chosen = originals[0].item.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
            
        }

        loadALL();
    },[]);

useEffect(()=>{
    const scrollListener = () => {
        if(window.scrolly > 10) {
            setBlackHeader(true);
        } else {
            setBlackHeader(false);
        }
    }
window.addEventListener('scroll', scrollListener);
return() => {
    window.removeEventListener('scroll', scrollListener);
}

}, [])

    return (
        <div className="page">

            <Header black={BlackHeader} />


           {featuredData &&
            <FeaturedMovie item={featuredData} />
            }

            <section className="lists">
                {movieList.map((item, key)=>(
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito com <span role="img" aria-label="coração">♥</span> pelo 4rNoNy
                Direitos de imagem para Netflix<br/>
                Dados pegos do site themoviedb.org
            </footer>


            {movieList.length <= 0 &&
            <div className="loading">
                <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando" />
                </div> 
            }    
        </div>
    )
}