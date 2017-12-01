const React = require('react');
const PropTypes = require('prop-types');
const assign = require('domkit/appendVendorPrefix');
const insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
const keyframes = {
    '0%': {
        transform: 'scale(1)'
    },
    '50%': {
        transform: 'scale(0.5)',
        opacity: 0.7
    },
    '100%': {
        transform: 'scale(1)',
        opacity: 1
    }
};

/**
 * @type {String}
 */
const animationName = insertKeyframesRule(keyframes);

/**
 * @param  {Number} top
 * @return {Number}
 */
function random(top) {
    return Math.random() * top;
}

const Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.string,
        margin: PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function () {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
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
        const animationDuration = random(100) / 100 + 0.6 + 's';
        const animationDelay = random(100) / 100 - 0.2 + 's';

        const animation = [animationName, animationDuration, animationDelay, 'infinite', 'ease'].join(' ');
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
        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function (loading) {
        if (loading) {
            const style = {
                width: parseFloat(this.props.size) * 3 + parseFloat(this.props.margin) * 6,
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
                    React.createElement('div', { style: this.getStyle(5) }),
                    React.createElement('div', { style: this.getStyle(6) }),
                    React.createElement('div', { style: this.getStyle(7) }),
                    React.createElement('div', { style: this.getStyle(8) }),
                    React.createElement('div', { style: this.getStyle(9) })
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
