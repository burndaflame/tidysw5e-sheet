export const tidysw5eListeners = function (html, actor) {
  // set input fields via editable elements
  html
    .find("[contenteditable]")
    .on("paste", function (e) {
      //strips elements added to the editable tag when pasting
      let $self = $(this);

      // set maxlength
      let maxlength = 40;
      if ($self[0].dataset.maxlength) {
        maxlength = parseInt($self[0].dataset.maxlength);
      }

      setTimeout(function () {
        let textString = $self.text();
        textString = textString.substring(0, maxlength);
        $self.html(textString);
      }, 0);
    })
    .on("keypress", function (e) {
      let $self = $(this);

      // set maxlength
      let maxlength = 40;
      if ($self[0].dataset.maxlength) {
        maxlength = parseInt($self[0].dataset.maxlength);
      }

      // only accept backspace, arrow keys and delete after maximum characters
      let keys = [8, 37, 38, 39, 40, 46];

      if ($(this).text().length === maxlength && keys.indexOf(e.keyCode) < 0) {
        e.preventDefault();
      }

      if (e.keyCode === 13) {
        $(this).blur();
      }
    });

  html.find("[contenteditable]").blur(async (event) => {
    let value = event.target.textContent;
    let target = event.target.dataset.target;
    html
      .find('input[type="hidden"][data-input="' + target + '"]')
      .val(value)
      .submit();
  });

  // actor size menu
  html.find(".actor-size-select .size-label").on("click", function () {
    let currentSize = $(this).data("size");
    $(this)
      .closest("ul")
      .toggleClass("active")
      .find('ul li[data-size="' + currentSize + '"]')
      .addClass("current");
  });
  html.find(".actor-size-select .size-list li").on("click", async (event) => {
    let value = event.target.dataset.size;
    actor.update({ "data.traits.size": value });
    html.find(".actor-size-select").toggleClass("active");
  });

  // Modificator Ability Test Throw
  html.find('.ability-mod.rollable').click( async (event) => {
    event.preventDefault();
    let ability = event.currentTarget.parentElement.parentElement.dataset.ability;
    actor.rollAbilityTest(ability, { event: event });
  });

  // Modificator Ability Saving Throw
  html.find('.ability-save.rollable').click( async (event) => {
    event.preventDefault();
    let ability = event.currentTarget.parentElement.parentElement.dataset.ability;
    actor.rollAbilitySave(ability, { event: event });
  });

  // toggle item edit protection
  html.find(".toggle-allow-edit span").click(async (event) => {
    event.preventDefault();

    if (actor.getFlag("tidysw5e-sheet", "allow-edit")) {
      await actor.unsetFlag("tidysw5e-sheet", "allow-edit");
    } else {
      await actor.setFlag("tidysw5e-sheet", "allow-edit", true);
    }
  });

  // toggle force powerbook tab
  html.find(".toggle-view-force span").click(async (event) => {
    event.preventDefault();

    if (actor.getFlag("tidysw5e-sheet", "view-force")) {
      await actor.unsetFlag("tidysw5e-sheet", "view-force");
    } else {
      await actor.setFlag("tidysw5e-sheet", "view-force", true);
    }
  });

  // toggle tech powerbook tab
  html.find(".toggle-view-tech span").click(async (event) => {
    event.preventDefault();

    if (actor.getFlag("tidysw5e-sheet", "view-tech")) {
      await actor.unsetFlag("tidysw5e-sheet", "view-tech");
    } else {
      await actor.setFlag("tidysw5e-sheet", "view-tech", true);
    }
  });
};
