const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  //const config = await createExpoWebpackConfigAsync(env, argv);
  // 上流から受け取った env に offline:true のキーバリューセットを追加している　要は offline 使うよ、って追加しているだけ
  const config = await createExpoWebpackConfigAsync(
    {
        ...env,
        offline: true,
    },
    argv
);
///////////////////////////////ここまで
  // Customize the config before returning it.
  return config;
};
