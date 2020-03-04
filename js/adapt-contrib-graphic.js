define([
    'core/js/adapt',
    'core/js/views/componentView',
    'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

    var GraphicView = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, {
                'pageView:ready': this.setupInview,
                'device:changed': this.resizeImage
            });

            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
        },

        setupInview: function() {
            this.setupInviewCompletion('.component-widget');
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        resizeImage: function(width) {
            var imageWidth = width === 'medium' ? 'small' : width;
            var imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';
            this.$('.graphic-widget img').attr('src', imageSrc);

            this.$('.graphic-widget').imageready(function() {
                this.setReadyStatus();
            }.bind(this));
        }
    });

    return Adapt.register('graphic', {
        model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
        view: GraphicView
    });

});
