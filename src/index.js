module.exports = function (generator) {

    // If no generator was provided, provide a no-op generator.
    if (!generator) {
        generator = function () { return null; }
    };

    return {
        next: function () {
            var result = generator();
            var done   = false;

            if (result == null) {
                done = true;
            };

            return {
                value: result,
                done:  done
            };
        }
    };
};
