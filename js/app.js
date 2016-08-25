var universeData = {
  name: 'universe',
  type: 'universe',
  inside: [
    {
      name: 'milky way',
      type:'galaxy',
      inside: [
        {
          name: 'solar system',
          type: 'planetary system',
          inside: [
            { name: 'mercury', type: 'planet' },
            { name: 'venus', type: 'planet' },
            {
              name: 'earth',
              type: 'planet',
              inside: [
                { name: 'moon', type: 'natural satellite' }
              ]
            },
            { name: 'mars',
              type: 'planet',
              inside: [
                { name: 'deimos', type: 'natural satellite' },
                { name: 'phobos', type: 'natural satellite' }
              ]
            },
            { name: 'jupiter', type: 'planet' },
            { name: 'saturn', type: 'planet' },
            { name: 'uranus', type: 'planet' },
            { name: 'neptune', type: 'planet' },
            { name: 'pluto', type: 'dwarf planet' },
          ]
        }
      ]
    }
  ]
}

Vue.component('edit-box', {
  template: '#eb-template',
  props: {
    model: Object
  },
  data: function () {
    return { name: '' };
  },
  methods: {
    change: function () {
      if (this.name.trim()) {
        this.$dispatch('change-name', this.name);
      }
    }
  }
});

Vue.component('uni-elements', {
  template: '#ue-template',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false,
      editBox: false
    }
  },
  computed: {
    hasInside: function () {
      return this.model.inside && this.model.inside.length
    }
  },
  methods: {
    toggle: function () {
      if (this.hasInside) {
        this.open = !this.open;
      }
    },
    giveInside: function () {
      if (!this.hasInside) {
        Vue.set(this.model, 'inside', [])
        this.addInside()
        this.open = true
      }
    },
    addInside: function () {
      this.model.inside.push({
        name: 'new astro'
      })
    },
    edit: function () {
      this.editBox = !this.editBox
    },
    remove: function(astro) {
      this.$parent.model.inside.$remove(astro)
    },
    handleChange: function (newAstro) {
      Vue.set(this.model, 'name', newAstro)
      this.editBox = !this.editBox
    }
  }
});

var vm = new Vue({
  el: '#universe',
  data: {
    uniData: universeData
  }
});

Vue.directive('focus', {
  bind: function () {
    var object = this.el;
    Vue.nextTick(function() {
      object.focus();
    });
  }
});
