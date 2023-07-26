# quick installation guide
these instructions assume installation on a fresh vps checked out from ramnode
since this is probably not your setup, you can skip to section 2

# section 1: setting up ramnode vps from scratch
this section is mostly for ourselves. this means that commands are not going to be genericized, e.g. "haicat" used for usernames, etc.

## correcting the default dns bullshit
at time of writing, ramnode's default setup has fucked up dns settings and wont resolve archive.ubuntu.com, preventing system updates or package installs

check the link device with:
```bash
resolvectl status
```
itll probably be named `venet0`, but if its not, replace `venet0` in this next command with whatever it is
```bash
resolvectl dns venet0 8.8.8.8
```
do not go any further without updating you fuck. yes. in the serial console.

now do this AFTER updating because updates fuck with config files sometimes and we dont wanna deal with that overridding our shit.
edit `/etc/systemd/resolved.conf`, uncomment the DNS line and set it to `8.8.8.8`

## user setup
```bash
	useradd -m haicat
	passwd haicat
	usermod -aG sudo haicat
	usermod --shell /bin/bash haicat
```
### setting up key authentication

remember this if you ever need to restart the service (also try `status` for info)
```bash
systemctl restart sshd
```

if needed, generate a key with puttygen. copy the "public key for pasting" section and save it somewhere

```bash
sudo mkdir /home/haicat/.ssh
sudo vi authorized_keys
```
add what you copied into here



edit `/etc/ssh/sshd_config`

uncomment / add :
* `PubkeyAuthentication yes`
* `AuthorizedKeysFile .ssh/authorized_keys .ssh/authorized_keys2`
* `PasswordAuthentication no`
  
change:
* `UsePAM yes` &rarr; `no`
* `PermitRootLogin yes` &rarr; `no`

reboot

## setting up node

[install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

relog

```bash
nvm install node --latest-npm
```

ALSO FUCKING UNINSTALL APACHE2 AAAAAA IT CAME PREINSTALLED FUCK

# section 2: uwu