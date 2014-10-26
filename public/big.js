window.onload = function() {
    var s = document.getElementsByTagName('div'), cur = 0, ti, tweets, children, reverse;
    if (!s) return;
    function go(n) {
		if (s[n].parentNode != document.getElementsByTagName('body')[0]){
			if (reverse)
				go(n-1)
			else
				go(n+1)
			return
		}
        cur = n;
        var i = 1e3, e = s[n], t;
        for (var k = 0; k < s.length; k++) s[k].style.display = 'none';
        e.style.display = 'inline';
        e.style.fontSize = i + 'px';
        if (e.firstChild.nodeName === 'IMG') {
            document.body.style.backgroundImage = 'url(' + e.firstChild.src + ')';
            e.firstChild.style.display = 'none';
            if ('classList' in e) e.classList.add('imageText');
        } else {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundColor = e.style.backgroundColor;
        }
		children = e.getElementsByTagName('div')
		if (children) {
			for(var rr = 0; rr < children.length; rr++) {
				children[rr].style.display = ''
			}
			children = false
		}
        if (ti !== undefined) window.clearInterval(ti);
        t = parseInt(e.getAttribute('time-to-next') || 0, 10);
        if (t > 0) ti = window.setTimeout(fwd, (t * 1000));
        while (
            e.offsetWidth > window.innerWidth ||
            e.offsetHeight > window.innerHeight) {
            e.style.fontSize = (i -= i * 0.05) + 'px';
            if (i < 0) break;
        }
        e.style.marginTop = ((window.innerHeight - e.offsetHeight) / 2) + 'px';
        if (window.location.hash !== n) window.location.hash = n;
        document.title = e.textContent || e.innerText;
    }
    document.onclick = function() { go(++cur % (s.length)); };
    function fwd() { 
		reverse=false
		go(Math.min(s.length - 1, ++cur)); 
	}
    function rev() { 
		reverse=true 
		go(Math.max(0, --cur)); 
	}
    document.onkeydown = function(e) {
        if (e.which === 39) fwd();
        if (e.which === 38) fwd();
        if (e.which === 33) fwd();
        if (e.which === 37) rev();
        if (e.which === 40) rev();
    };
    document.ontouchstart = function(e) {
        var x0 = e.changedTouches[0].pageX;
        document.ontouchend = function(e) {
            var x1 = e.changedTouches[0].pageX;
            if (x1 - x0 < 0) fwd();
            if (x1 - x0 > 0) rev();
        };
    };
    function parse_hash() {
        return Math.max(Math.min(
            s.length - 1,
            parseInt(window.location.hash.substring(1), 10)), 0);
    }
    if (window.location.hash) cur = parse_hash() || cur;
    window.onhashchange = function() {
        var c = parse_hash();
        if (c !== cur) go(c);
    };

    go(cur);

};
