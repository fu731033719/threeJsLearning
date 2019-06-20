function init() {
    var width = window.innerWidth
    var height = window.innerHeight
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 800)
    camera.position.x = 10
    camera.position.y = 10
    camera.position.z = 30
    camera.lookAt(scene.position)
    var renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x260d02)
    renderer.setSize(width, height)
    var cubeGeometry = new THREE.BoxGeometry(7,8,9)
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x1367b5
    })
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.x = 0
    cube.position.y = -2
    cube.position.z = 0
    scene.add(cube)
    document.body.appendChild(renderer.domElement)
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01
        cube.rotation.z += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}
init()