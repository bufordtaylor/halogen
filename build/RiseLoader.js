const React = require('react');
const PropTypes = require('prop-types');
const assign = require('domkit/appendVendorPrefix');
const insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Number}
 */
const riseAmount = 30;

/**
 * @type {Object}
 */
const keyframesEven = {
    '0%': {
        transform: 'scale(1.1)'
    },
    '25': {
        transform: 'translateY(-' + riseAmount + 'px)'
    },
    '50%': {
        transform: 'scale(0.4)'
    },
    '75%': {
        transform: 'translateY(' + riseAmount + 'px)'
    },
    '100%': {
        transform: 'translateY(0) scale(1.0)'
    }
};

/**
 * @type {Object}
 */
const keyframesOdd = {
    '0%': {
        transform: 'scale(0.4)'
    },
    '25': {
        transform: 'translateY(' + riseAmount + 'px)'
    },
    '50%': {
        transform: 'scale(1.1)'
    },
    '75%': {
        transform: 'translateY(-' + riseAmount + 'px)'
    },
    '100%': {
        transform: 'translateY(0) scale(0.75)'
    }
};

/**
 * @type {String}
 */
const animationNameEven = insertKeyframesRule(keyframesEven);

/**
 * @type {String}
 */
const animationNameOdd = insertKeyframesRule(keyframesOdd);

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
        const animation = [i % 2 == 0 ? animationNameEven : animationNameOdd, '1s', '0s', 'infinite', 'cubic-bezier(.15,.46,.9,.6)'].join(' ');
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
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle(1) }),
                React.createElement('div', { style: this.getStyle(2) }),
                React.createElement('div', { style: this.getStyle(3) }),
                React.createElement('div', { style: this.getStyle(4) }),
                React.createElement('div', { style: this.getStyle(5) })
            );
        }

        return null;
    },

    render: function () {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

