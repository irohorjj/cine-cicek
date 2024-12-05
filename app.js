const express = require('express');
const app = express();

// Statik dosyalar için public klasörü
app.use(express.static('public'));

// View engine olarak EJS kullan
app.set('view engine', 'ejs');

// Film veritabanı
const newMovies = [
    {
        title: "Oppenheimer",
        year: 2023,
        rating: 8.9,
        duration: "180 dk",
        image: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Oppenheimer-Cillian-Murphy/dp/B0CGQZ1PT4" }
    },
    {
        title: "Barbie",
        year: 2023,
        rating: 7.0,
        duration: "114 dk",
        image: "https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Barbie-Margot-Robbie/dp/B0CB6GDDC8" }
    },
    {
        title: "Inception",
        year: 2010,
        rating: 8.8,
        duration: "148 dk",
        image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/70131314", amazon: "https://www.amazon.com/Inception-Leonardo-DiCaprio/dp/B0047WJ11G" }
    },
    {
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        duration: "152 dk",
        image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/70079583", amazon: "https://www.amazon.com/Dark-Knight-Christian-Bale/dp/B001QEXCK4" }
    },
    {
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        duration: "154 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/880640", amazon: "https://www.amazon.com/Pulp-Fiction-John-Travolta/dp/B008R9H05Y" }
    },
    {
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        duration: "136 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYjcyZDYwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/20557937", amazon: "https://www.amazon.com/Matrix-Keanu-Reeves/dp/B00NXHWVVU" }
    },
    {
        title: "Forrest Gump",
        year: 1994,
        rating: 8.8,
        duration: "142 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/60000724", amazon: "https://www.amazon.com/Forrest-Gump-Tom-Hanks/dp/B002QVZ71M" }
    },
    {
        title: "Fight Club",
        year: 1999,
        rating: 8.8,
        duration: "139 dk",
        image: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Fight-Club-Brad-Pitt/dp/B003MAQM6Q" }
    },
    {
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        duration: "142 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/70005379", amazon: "https://www.amazon.com/Shawshank-Redemption-Tim-Robbins/dp/B002XUBDRY" }
    },
    {
        title: "Gladiator",
        year: 2000,
        rating: 8.5,
        duration: "155 dk",
        image: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/60000929", amazon: "https://www.amazon.com/Gladiator-Russell-Crowe/dp/B00NXHWVVU" }
    },
    {
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        duration: "169 dk",
        image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktNjEyOS00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/70305903", amazon: "https://www.amazon.com/Interstellar-Matthew-McConaughey/dp/B00TU9UFTS" }
    },
    {
        title: "The Wolf of Wall Street",
        year: 2013,
        rating: 8.2,
        duration: "180 dk",
        image: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/70266676", amazon: "https://www.amazon.com/Wolf-Wall-Street-Leonardo-DiCaprio/dp/B00IIXT0NS" }
    },
    {
        title: "Joker",
        year: 2019,
        rating: 8.4,
        duration: "122 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNTEwYS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Joker-Joaquin-Phoenix/dp/B07YVHTH5P" }
    },
    {
        title: "The Departed",
        year: 2006,
        rating: 8.5,
        duration: "151 dk",
        image: "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/70044689", amazon: "https://www.amazon.com/Departed-Leonardo-DiCaprio/dp/B000NQRW94" }
    },
    {
        title: "Se7en",
        year: 1995,
        rating: 8.6,
        duration: "127 dk",
        image: "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNzI1YjVjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/950149", amazon: "https://www.amazon.com/Se7en-Brad-Pitt/dp/B000GOUXI8" }
    },
    {
        title: "The Silence of the Lambs",
        year: 1991,
        rating: 8.6,
        duration: "118 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00NWE2LTg3YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Silence-Lambs-Jodie-Foster/dp/B002CMLH3U" }
    },
    {
        title: "Goodfellas",
        year: 1990,
        rating: 8.7,
        duration: "146 dk",
        image: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/70002022", amazon: "https://www.amazon.com/Goodfellas-Robert-De-Niro/dp/B002QVZ71W" }
    },
    {
        title: "Saving Private Ryan",
        year: 1998,
        rating: 8.6,
        duration: "169 dk",
        image: "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Saving-Private-Ryan-Tom-Hanks/dp/B002RWJGK4" }
    },
    {
        title: "The Green Mile",
        year: 1999,
        rating: 8.6,
        duration: "189 dk",
        image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Green-Mile-Tom-Hanks/dp/B002VECLWO" }
    },
    {
        title: "The Pianist",
        year: 2002,
        rating: 8.5,
        duration: "150 dk",
        image: "https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODJiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/60025061", amazon: "https://www.amazon.com/Pianist-Adrien-Brody/dp/B009EEQYSO" }
    },
    {
        title: "Schindler's List",
        year: 1993,
        rating: 9.0,
        duration: "195 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzgtYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        platforms: { netflix: "https://www.netflix.com/title/60036359", amazon: "https://www.amazon.com/Schindlers-List-Liam-Neeson/dp/B009WJADJA" }
    },
    {
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
        rating: 9.0,
        duration: "201 dk",
        image: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Lord-Rings-Return-King/dp/B009ITL7UQ" }
    },
    {
        title: "Parasite",
        year: 2019,
        rating: 8.5,
        duration: "132 dk",
        image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
        platforms: { netflix: "", amazon: "https://www.amazon.com/Parasite-English-Subtitled-Kang-Song/dp/B07YM14FRG" }
    }
    // ... ve diğer filmler devam edecek
];

// Serkan'ın Favorileri
const serkanFavorites = [
    {
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        duration: "175 dk",
        description: "Corleone ailesinin destansı hikayesi. Don Vito Corleone'nin en küçük oğlu Michael'ın, istemeyerek de olsa ailenin başına geçmesi ve New York'un en güçlü mafya ailesinin başı olması anlatılıyor.",
        image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
        platforms: {
            netflix: "https://www.netflix.com/title/60011152",
            amazon: "https://www.amazon.com/Godfather-Marlon-Brando/dp/B0091XWZJ8"
        }
    },
    {
        title: "The Godfather: Part II",
        year: 1974,
        rating: 9.0,
        duration: "202 dk",
        description: "Michael Corleone'nin yükselişi ve babası Vito'nun gençlik yılları paralel olarak anlatılıyor. Aile imparatorluğunu genişletirken, geçmişin izleri peşini bırakmıyor.",
        image: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        platforms: {
            netflix: "https://www.netflix.com/title/60011663",
            amazon: "https://www.amazon.com/Godfather-Part-II-Al-Pacino/dp/B0091XWZGY"
        }
    },
    {
        title: "The Godfather: Part III",
        year: 1990,
        rating: 7.6,
        duration: "162 dk",
        description: "Michael Corleone, ailesini suç dünyasından uzaklaştırmaya çalışırken, yeğeni Vincent öne çıkıyor. Vatikan ile olan ilişkiler ve aile dramı iç içe geçiyor.",
        image: "https://upload.wikimedia.org/wikipedia/en/5/55/GodfatherIII2.jpg",
        platforms: {
            netflix: "https://www.netflix.com/title/60011150",
            amazon: "https://www.amazon.com/Godfather-Part-III-Al-Pacino/dp/B0091XWZH6"
        }
    },
    {
        title: "Scarface",
        year: 1983,
        rating: 8.3,
        duration: "170 dk",
        description: "Kübalı göçmen Tony Montana'nın, Miami'nin uyuşturucu kralı olma yolundaki hırslı ve şiddet dolu yükselişi. Al Pacino'nun unutulmaz performansıyla, bir Amerikan rüyası hikayesi.",
        image: "https://m.media-amazon.com/images/M/MV5BNjdjNGQ4NDEtNTEwYS00MTgxLTliYzQtYzE2ZDRiZjFhZmNlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        platforms: {
            netflix: "https://www.netflix.com/title/60029681",
            amazon: "https://www.amazon.com/Scarface-Al-Pacino/dp/B009CG01AE"
        }
    }
];

// Ana sayfa
app.get('/', (req, res) => {
    res.render('index', { 
        newMovies: newMovies
    });
});

// Serkan'ın Favorileri sayfası
app.get('/serkan-favorites', (req, res) => {
    res.render('serkan-favorites', { 
        favorites: serkanFavorites 
    });
});

// Yeni Filmler sayfası
app.get('/new-movies', (req, res) => {
    res.render('new-movies', { 
        movies: newMovies 
    });
});

// Server'ı başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
