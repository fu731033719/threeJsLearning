function init() {
    // 获取浏览器窗口的宽高，后续会用
    var width = window.innerWidth
    var height = window.innerHeight

    // 创建一个场景
    var scene = new THREE.Scene()

    // 创建一个具有透视效果的摄像机
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 800)

    // 设置摄像机位置，并将其朝向场景中心
    camera.position.x = 10
    camera.position.y = 10
    camera.position.z = 30
    camera.lookAt(scene.position)

    var renderer = new THREE.WebGLRenderer()

    renderer.setClearColor(0xffffff)
    renderer.setSize(width, height)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    var spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(30, 60, 40)
    spotLight.castShadow = false
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024

    scene.add(spotLight)

    var orbitControls = new THREE.OrbitControls(camera)
    orbitControls.autoRotate = true

    var planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1)
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true

    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(0, -4, -10)
    scene.add(plane)

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)

    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    })

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    cube.position.x = 0
    cube.position.y = -2
    cube.position.z = 0
    cube.castShadow = true
    scene.add(cube)




    document.body.appendChild(renderer.domElement)

    function render() {
        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }
    render()
}
init()