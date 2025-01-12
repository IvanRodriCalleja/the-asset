# Enable inheritEnv

jest_config=$3

current_script=$(realpath "$0")
current_dir=$(dirname "$current_script")
cwd=$(echo "$jest_config" | sed 's|\(.*\)/.*|\1|')
root_dir="$current_dir/.."

cd "$cwd"

command="node '$root_dir/node_modules/.bin/jest' '$1' -c $jest_config -t '$5' $6"

eval "$command"

cd $root_dir