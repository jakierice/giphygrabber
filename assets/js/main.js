var heroes = ['Iron Man', 'Captain America', 'Spiderman', 'Hulk', 'Thor', 'Black Widow', 'Hawkeye'];

function heroButtons() {
    $('#buttonsHolder').empty();
    $.each(heroes, function (index, hero) {
        // create "button" div for each hero name in heroes array
        var button = $('<div>');

        // add heroButton class and the hero's name as a data attribute
        button.html(hero)
            .addClass('heroButton')
            .attr('data-hero', hero.toUpperCase())
            .attr('data-state', 'still')
            .click(function () {
                getGifs(hero);
            });

        // append the new buttons to the appropriate <div>
        $('#buttonsHolder').append(button);
    })
}

$('#searchSubmit').click(function (event) {
    event.preventDefault();

    var newHero = $('#searchInput').val();

    heroes.push(newHero);
    heroButtons();

    $('#searchInput').val('');
})

// $('.heroButton').click(function () {
function getGifs(heroName) {

    var queryURL = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=9&q=' + heroName;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        var results = response.data;
        $('#gifsHolder').empty();

        // console.log(results);
        $.each(results, function (result, gifInfo) {

            var holder = $('<div>');
            var gif = $('<img>');
            var rating = $('<div>');

            rating.html('<h2>Rating: ' + gifInfo.rating.toUpperCase() + '</h2>')
                .addClass('gifRating');

            gif.addClass('gifImage')
                .attr('src', gifInfo.images.fixed_height_still.url)
                .click(function () {
                    var state = $(this).attr('data-state');

                    if (state === 'still') {
                        $(this).attr('data-state', 'animate')
                            .attr('src', gifInfo.images.fixed_height.url);
                    } else {
                        $(this).attr('data-state', 'still')
                            .attr('src', gifInfo.images.fixed_height_still.url)
                    }
                })

            holder.append(gif, rating)
                .addClass('gifHolder');

            $('#gifsHolder').append(holder);
        })
    })
};

heroButtons();