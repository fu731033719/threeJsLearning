function init() {
    var width = window.innerWidth
    var height = window.innerHeight
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 800)
    camera.position.x = 0
    camera.position.y = 10
    camera.position.z = 200
    camera.lookAt(scene.position)
    var renderer = new THREE.WebGLRenderer({
        antialias: true  // 开启抗齿锯
    })
    renderer.setClearColor(0x000000)
    renderer.setSize(width, height)
    document.body.appendChild(renderer.domElement)
    // 初始化摄像机插件
    var orbitControls = new THREE.OrbitControls(camera)
    orbitControls.autoRotate = true
    var img = new Image();
    img.src = "https://img.alicdn.com/tfs/TB1zFzsUSzqK1RjSZPcXXbTepXa-39-39.png";
    var getTexture = function () {
        var canvas = document.createElement('canvas')
        canvas.width = 32;
        canvas.height = 32;
        var ctx = canvas.getContext('2d');
        //start
        ctx.beginPath();
        var rot = 5;
        var x = 4;
        var y = 3;
        var R = 5;
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72 - rot) / 180 * Math.PI) * R + x, -Math.sin((18 + i * 72 - rot) / 180 * Math.PI) * R + y);
            ctx.lineTo(Math.cos((54 + i * 72 - rot) / 180 * Math.PI) * R * 0.5 + x, -Math.sin((54 + i * 72 - rot) / 180 * Math.PI) * R * 0.5 + y)
        }
        ctx.closePath();
        ctx.fillStyle = '#fcf005';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true
        return texture
    }
    var geometry = new THREE.Geometry()
    var material = new THREE.PointsMaterial({
        size: 10,
        transparent: true,
        opacity: 1,
        // 指定纹理
        map: getTexture(),
        // 粒子的大小是否和其与摄像机的距离有光，默认值 true
        sizeAttenuation: true,
        // 用于去除纹理的黑色背景，关于 depthTest 和 depthWrite 的详细解释，请查看https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p
        depthWrite: false
    })
    var range = 1000
    for (var i = 0; i < 1000; i++) {
        var particle = new THREE.Vector3(
            Math.random() * range - range / 2,
            Math.random() * range - range / 2,
            Math.random() * range - range / 2)

        geometry.vertices.push(particle)
    }
    var points = new THREE.Points(geometry, material)
    console.log(points)
    scene.add(points)
    render()
    var step = 0
    function render() {
        // 渲染，即摄像机拍下此刻的场景
        renderer.render(scene, camera)
        step += 0.001;
        points.rotation.x = step;
        points.rotation.z = step;
        requestAnimationFrame(render)
    }
}
init()