const React = require('react');
const PropTypes = require('prop-types');
const assign = require('domkit/appendVendorPrefix');
const insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
const animations = {};

const Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.number,
        margin: PropTypes.number
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function () {
        return {
            loading: true,
            color: '#ffffff',
            size: 25,
            margin: 2
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function (i) {
        const size = this.props.size;
        let animationName = animations[size];

        if (!animationName) {
            const keyframes = {
                '75%': {
                    opacity: 0.7
                },
                '100%': {
                    transform: 'translate(' + -4 * size + 'px,' + -size / 4 + 'px)'
                }
            };
            animationName = animations[size] = insertKeyframesRule(keyframes);
        }

        const animation = [animationName, '1s', i * 0.25 + 's', 'infinite', 'linear'].join(' ');
        const animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function (i) {
        if (i == 1) {
            const s1 = this.props.size + 'px solid transparent';
            const s2 = this.props.size + 'px solid ' + this.props.color;

            return {
                width: 0,
                height: 0,
                borderRight: s1,
                borderTop: s2,
                borderLeft: s2,
                borderBottom: s2,
                borderRadius: this.props.size
            };
        }

        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            width: 10,
            height: 10,
            transform: 'translate(0, ' + -this.props.size / 4 + 'px)',
            position: 'absolute',
            top: 25,
            left: 100
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function (loading) {
        if (loading) {
            const style = {
                position: 'relative',
                fontSize: 0
            };

            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: style },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) }),
                    React.createElement('div', { style: this.getStyle(3) }),
                    React.createElement('div', { style: this.getStyle(4) }),
                    React.createElement('div', { style: this.getStyle(5) })
                )
            );
        }

        return null;
    },

    render: function () {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;
