
new TypeIt("#element", {
    speed: 200,
})
    .type("By")
    .pause(500)
    .type(" Adit")
    .pause(600)
    .move(-3)
    .pause(200)
    .type("a")
    .move(4)
    .pause(600)
    .type(" Tsmbe")
    .delete(4)
    .pause(500)
    .type("ambe")
    .go();

