<script lang="ts">
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let letters = alphabet.split('');

    const colors = '#538d4e,#b59f3b,#3a3a3c,#538d4e,#b59f3b'
    let colorsArr = colors.split(',');

    export let loading = false;
    let shiftAnimate;

    $: {
        if (loading) {
            shiftAnimate = setInterval(shiftLetters, 500);
        } else {
            clearInterval(shiftAnimate);
            letters = alphabet.split('');
            colorsArr = colors.split(',');
        }
    }

    const shiftLetters = () => {
        const shifted = letters.shift();
        letters.push(shifted);

        const colorShift = colorsArr.shift();
        colorsArr.push(colorShift);

        letters = letters; // make sure svelte reacts properly
        colorsArr = colorsArr;
    }
</script>

<div id="loader">
    {#if loading}
        <span style={`color:${colorsArr[0]}`}>
            {letters[0]}
        </span>
        <span style={`color:${colorsArr[1]}`}>
            {letters[1]}
        </span>
        <span style={`color:${colorsArr[2]}`}>
            {letters[2]}
        </span>
        <span style={`color:${colorsArr[3]}`}>
            {letters[3]}
        </span>
        <span style={`color:${colorsArr[4]}`}>
            {letters[4]}
        </span>
    {/if}
</div>